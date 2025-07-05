import "./newUser.scss";
import UserForm from "../../components/forms/UserForm";

const NewUser = () => {
  return (
    <main className="new-user">
      <header className="new-user__header">
        <h1 className="new-user__title">Add New User</h1>
      </header>
      <section className="new-user__form-section">
        <UserForm />
      </section>
    </main>
  );
};

export default NewUser;
