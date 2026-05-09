"use client";

// This component was previously self-referencing (dynamic import of itself),
// which caused an infinite loop. It has been converted to a simple placeholder.
// Replace this with actual heavy content that benefits from lazy loading.

export default function HeavyComponent() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold">Heavy Component</h3>
      <p className="mt-2 text-gray-600">
        This component is loaded dynamically to reduce initial bundle size.
      </p>
    </div>
  );
}
