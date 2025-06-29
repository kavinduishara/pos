import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

function UserRow({ user, onDelete,onRole }) {
  const [selectedRole, setSelectedRole] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedRole) {
      console.log(`Add ${user.email} as ${selectedRole}`);
      onRole(user.email,selectedRole)
      // Optional: send to backend
    } else {
      alert("Please select a role");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(user.email); // this will remove the user from parent state
  };

  return (
    <tr>
      <td className="border-b border-gray-300 text-center">{user.fullName}</td>
      <td className="border-b border-gray-300 text-center">{user.email}</td>
      <td className="border-b border-gray-300 text-center">
        <form onSubmit={handleAdd} className="flex flex-col items-center gap-2">
          <div className="flex gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`role-${user.email}`}
                value="admin"
                checked={selectedRole === "admin"}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="accent-blue-500"
              />
              <span>Admin</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`role-${user.email}`}
                value="cashier"
                checked={selectedRole === "cashier"}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="accent-blue-500"
              />
              <span>Cashier</span>
            </label>

            <button type="submit" className="text-green-500 hover:text-green-600" title="Add">
              <PlusCircle />
            </button>
          </div>
        </form>

        <form onSubmit={handleDelete} className="mt-2">
          <button type="submit" className="text-red-500 hover:text-red-600" title="Delete">
            <Trash2 />
          </button>
        </form>
      </td>
    </tr>
  );
}

export default UserRow;