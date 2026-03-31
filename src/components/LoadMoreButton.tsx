import { Button, Spin } from "antd";

export default function LoadMoreButton({ hasNextPage, isFetchingNextPage, onLoadMore }: { hasNextPage: boolean, isFetchingNextPage: boolean, onLoadMore: () => void }) {
  return (
    <div className="w-full flex justify-center mt-10">
      {isFetchingNextPage ? (
        <Spin />
      ) : (
        <>
          {hasNextPage && (
            <Button
              type="primary"
              onClick={onLoadMore}
              disabled={isFetchingNextPage}
            >
              Load more
            </Button>
          )}
        </>
      )}
    </div>
  );
}
