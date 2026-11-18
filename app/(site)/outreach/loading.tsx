export default function OutreachLoading() {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-12" role="status">
      <p>Loading outreach projects...</p>
      <div aria-hidden="true" className="mt-8 space-y-6 motion-safe:animate-pulse">
        <div className="h-12 rounded bg-base-200" />
        {[0, 1, 2].map((item) => (
          <div key={item} className="space-y-3 py-4">
            <div className="h-5 w-2/3 rounded bg-base-200" />
            <div className="h-4 w-1/2 rounded bg-base-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
