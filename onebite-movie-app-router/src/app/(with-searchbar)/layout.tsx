import Searchbar from "./search/searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Searchbar />
      <main>{children}</main>
    </div>
  );
}
