import DOMPurify from "dompurify";

function truncateHtml(html: string, maxLength: number = 100) {
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  return clean.length > maxLength ? clean.slice(0, maxLength) + "..." : clean;
}

export default function TruncateParagraph({ data }: { data: string }) {
  const body = data || "";

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: truncateHtml(body, 155),
      }}
    ></p>
  );
}
