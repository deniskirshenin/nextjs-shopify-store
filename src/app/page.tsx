import Blog from "@/components/Blog";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import ProductGrid from "@/components/ProductGrid";

const Home = async () => {
  return (
    <main className="mx-auto">
      <Hero/>
      <NewArrivals />
      <Featured />
      <ProductGrid />
      <Blog />
    </main>
  );
};

export default Home;