import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const summaryData = [
  {
    title: "Total",
    result: "$12.4k",
    positive: false,
  },
  {
    title: "Last Week",
    result: "$12.4k",
    positive: true,
  },
  {
    title: "Last Month",
    result: "$12.4k",
    positive: true,
  },
];

const Featured = () => {
  return (
    <section className="featured" aria-labelledby="featured-title">
      <header className="featured__header">
        <h2 id="featured-title" className="featured__title">
          Total Revenue
        </h2>
        <MoreVertIcon fontSize="small" />
      </header>

      <div className="featured__body">
        <div className="featured__chart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>

        <p className="featured__label">Total sales made today</p>
        <p className="featured__amount">$420</p>
        <p className="featured__desc">
          Previous transactions processing. Last payments may not be included.
        </p>

        <div className="featured__summary">
          {summaryData.map(({ title, result, positive }, index) => (
            <div className="featured__item" key={index}>
              <p className="featured__item-title">{title}</p>
              <div
                className={`featured__result ${
                  positive
                    ? "featured__result--positive"
                    : "featured__result--negative"
                }`}
              >
                {positive ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
                <span className="featured__result-value">{result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
