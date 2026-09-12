import HomePage, { generateMetadata } from "./Home/page";

export { generateMetadata };

export default async function Home() {
  return <HomePage />;
}
