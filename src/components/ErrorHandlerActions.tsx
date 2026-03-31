import { useContext } from "react";
import { Alert, Button, Result } from "antd";
import { ThemeContext } from "@context";

type ApiError = {
  response?: {
    status: number;
    data?: unknown;
  };
};
function isApiError(err: unknown): err is ApiError {
  return typeof err === "object" && err !== null && "response" in err;
}

export default function ErrorHandlerActions({
  error,
  refetch,
}: {
  error: unknown;
  refetch: () => void;
}) {
  const { isLight } = useContext(ThemeContext);
  if (isApiError(error) && error.response?.status === 429) {
    return (
      <div className="mt-25">
        <Alert
          message="Rate limit exceeded"
          description="Too many requests have been made in a short period. Please wait a moment and try again."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Result
        status="error"
        title={
          <span className={`${isLight ? "text-black" : "text-white"}`}>
            Network Error
          </span>
        }
        subTitle={
          <span className={`${isLight ? "text-black" : "text-white"}`}>
            Something went wrong. Please check your connection and try again.
          </span>
        }
        extra={[
          <Button type="primary" onClick={() => refetch()} key="retry">
            Retry
          </Button>,
        ]}
      />
    </div>
  );
}
