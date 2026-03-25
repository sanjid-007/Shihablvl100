export default function Container({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1400px] mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}