import { useRef, useEffect, useState, useMemo, useCallback, useLayoutEffect } from "react";
import { Box, SxProps, Typography, Button, Fade, CircularProgress } from "@mui/material";
import useAppSelector from "@core/hooks/useSelector";
import { IMessage } from "@core/types/message.interface";
import { getMessagesofConversation } from "@core/api/shared/chatsApi";
import { useChatSocket } from "@core/contexts/ChatSocketContext";
import { groupMessagesByDate } from "./messageGrouper";
import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import DateGroup from "./DateGroup";
import MessageBubble from "./MessageBubble";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

type ChatMessagesProps = {
  conversationId: string;
  styles?: SxProps;
};

const SCROLL_THRESHOLD = 100;
const DEBOUNCE_DELAY = 200;

const ChatMessages = ({ conversationId, styles }: ChatMessagesProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const isAtBottomRef = useRef(isAtBottom);
  const { socket } = useChatSocket();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  // Keep refs up to date
  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [loading, hasMore]);

  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  // Socket handlers
  useEffect(() => {
    if (!socket) return;

    const handleSendMessage = (message: IMessage) => {
      if (message.conversation !== conversationId) return;
      setMessages((prev) => [...prev, message]);
      scrollToBottom(true);
    };

    const handleIncomingMessage = (message: IMessage) => {
      if (message.conversation !== conversationId) return;

      setMessages((prev) => [...prev, message]);

      if (isAtBottomRef.current) {
        scrollToBottom(true);
      } else {
        setNewMessagesCount((prev) => prev + 1);
      }
      socket.emit("read-message", { roomId: conversationId, messageId: message.id });
    };

    socket.on("message-send", handleSendMessage);
    socket.on("new-message", handleIncomingMessage);
    socket.on("message-updated", (message: IMessage) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? message : m))
      );
    });

    return () => {
      socket.off("message-send", handleSendMessage);
      socket.off("new-message", handleIncomingMessage);
      socket.off("message-updated");
    };
  }, [socket, conversationId]);

  // Fetch chats (older messages)
  const fetchChats = useCallback(async (pageNum: number) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    // Record current container height
    const container = containerRef.current;
    const prevHeight = container?.scrollHeight || 0;

    setLoading(true);
    try {
      const response = await getMessagesofConversation(conversationId, pageNum, 15);
      const olderMessages = response.data.reverse();
      // Prepend older messages
      setMessages((prev) => pageNum === 1 ? olderMessages : [...olderMessages, ...prev]);
      setHasMore(response.hasNextPage);
      setPage(pageNum);

      if (pageNum === 1) {
        setInitialLoadComplete(true);
        scrollToBottom(false);
      } else if (container) {
        // Adjust scroll position to preserve scroll offset after prepending messages
        requestAnimationFrame(() => {
          const newHeight = container.scrollHeight;
          container.scrollTop = newHeight - prevHeight;
        });
      }
    } catch (error) {
      console.error("Error loading messages", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Initial fetch on conversation change
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setNewMessagesCount(0);
    fetchChats(1);
  }, [conversationId, fetchChats]);

  // Scroll handler for infinite scroll and detecting bottom
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    setIsAtBottom(distanceFromBottom < SCROLL_THRESHOLD);

    // If scrolled to top, load older messages
    if (scrollTop === 0 && hasMoreRef.current && !loadingRef.current) {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => fetchChats(page + 1), DEBOUNCE_DELAY);
    }
  }, [fetchChats, page]);

  useLayoutEffect(() => {
    if (isAtBottom) {
      scrollToBottom(true);
    }
  }, [messages, isAtBottom]);

  const scrollToBottom = useCallback((smooth = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    }
    setNewMessagesCount(0);
  }, []);

  const groupedMessages = useMemo(() => groupMessagesByDate(messages), [messages]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <ScrollableContainer
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1,
          ...styles,
        }}
      >
        {loading && page > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {initialLoadComplete && Object.keys(groupedMessages).length === 0 ? (
          <Typography textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
            No messages yet. Start a conversation!
          </Typography>
        ) : (
          Object.entries(groupedMessages).map(([date, msgs]) => (
            <DateGroup key={date} date={date}>
              {msgs.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={user?.id === msg.sender}
                />
              ))}
            </DateGroup>
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollableContainer>

      <Fade in={!isAtBottom && newMessagesCount > 0}>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => scrollToBottom(true)}
            startIcon={<KeyboardDoubleArrowDownIcon />}
            sx={{
              borderRadius: 28,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 5,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {newMessagesCount} New Message{newMessagesCount > 1 ? 's' : ''}
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default ChatMessages;
