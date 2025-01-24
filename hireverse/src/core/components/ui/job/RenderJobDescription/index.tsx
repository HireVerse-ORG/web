import DOMPurify from 'dompurify';
import "./style.css"

type RenderJobDescriptionProps = {
  htmlContent: string;
}

const RenderJobDescription = ({ htmlContent }: RenderJobDescriptionProps) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
      className='job-desc'
    />
  );
};

export default RenderJobDescription;
