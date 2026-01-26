import DirectContextProvider from "@/contexts/direct.context";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DirectContextProvider>{children}</DirectContextProvider>
    </div>
  );
}
