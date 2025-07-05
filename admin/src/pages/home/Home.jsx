import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import List from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const widgetTypes = ["users", "orders", "products", "earnings"];

const Home = () => {
  return (
    <main className="home">
      <section className="home__widgets">
        {widgetTypes.map((type) => (
          <Widget key={type} type={type} />
        ))}
      </section>
      <section className="home__analytics">
        <Featured />
        <Chart title="Last 6 Months (users analytics)" aspect={2 / 1} />
      </section>
      <section className="home__transactions">
        <h2 className="home__section-title">Latest Transactions</h2>
        <List />
      </section>
    </main>
  );
};

export default Home;
