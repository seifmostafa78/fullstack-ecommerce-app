import "./user.scss";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useUserQuery } from "../../redux/features/user/userApiSlice";
import { formatDate } from "../../lib/formatters";
import UserForm from "../../components/forms/UserForm";

const Single = () => {
  const { userId } = useParams();
  const { data: user, refetch } = useUserQuery(userId);

  return (
    <main className="user-page">
      <div className="user-page__top">
        <section className="user-page__info-card">
          <button className="user-page__edit-btn">Edit</button>
          <h2 className="user-page__section-title">Information</h2>
          <div className="user-page__item">
            <img
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt="user avatar"
              className="user-page__image"
            />
            <div className="user-page__details">
              <h3 className="user-page__name">
                {user?.first_name} {user?.last_name}
              </h3>
              <div className="user-page__attribute-row">
                <span className="user-page__attribute-key">id:</span>
                <span className="user-page__attribute-value">{user?._id}</span>
              </div>
              <div className="user-page__attribute-row">
                <span className="user-page__attribute-key">Email:</span>
                <span className="user-page__attribute-value">
                  {user?.email}
                </span>
              </div>
              <div className="user-page__attribute-row">
                <span className="user-page__attribute-key">Created at:</span>
                <span className="user-page__attribute-value">
                  {formatDate(user?.createdAt)}
                </span>
              </div>
              <div className="user-page__attribute-row">
                <span className="user-page__attribute-key">Role:</span>
                <span className="user-page__attribute-value">
                  {user?.isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="user-page__chart-section">
          <Chart title="User Spending (last 6 month)" aspect={3 / 1} />
        </section>
      </div>

      <section className="user-page__form-section">
        <h2 className="user-page__section-title">Update User</h2>
        <UserForm user={user} onUpdate={refetch} />
      </section>
    </main>
  );
};

export default Single;
