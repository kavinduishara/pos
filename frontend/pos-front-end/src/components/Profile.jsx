import React from 'react';
import { useAuth } from '../context/Authcontext';
import { User } from 'lucide-react'; // Optional icon

const Profile = () => {
  const auth = useAuth();

  return (
    <>
      <div className="grid grid-cols-1 h-full p-6 bg-gray-100 place-items-center">
        <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-200 max-w-lg w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-sky-200 text-sky-800 rounded-full p-3">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-sky-800">User Profile</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm font-mono tabular-nums border-b pb-4 text-gray-700">
            <div className="text-right pr-2 text-gray-500 space-y-2">
              <p>FULL NAME</p>
              <p>EMAIL</p>
              <p>SHOP</p>
              <p>ROLE</p>
            </div>
            <div className="text-left pl-2 space-y-2">
              <p>{auth.user.fullName}</p>
              <p>{auth.user.email}</p>
              <p>{auth.shop.shopName}</p>
              <p>{auth.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
