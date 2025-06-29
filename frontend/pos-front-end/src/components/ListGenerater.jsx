import UserRow from "./UserRow";

function ListGenerater({ list, onDelete,onRole }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-300 text-center">
          <th>FULL NAME</th>
          <th>E-MAIL</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, index) => (
          <UserRow key={user.email} user={user} onDelete={onDelete} onRole={onRole} />
        ))}
      </tbody>
    </table>
  );
}

export default ListGenerater;