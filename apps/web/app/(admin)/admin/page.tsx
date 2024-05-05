"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { AdminUser } from "../../../interfaces";
import axios from "axios";
import Loder from "../../../components/Loder";
import Link from "next/link";

const page = () => {
  const { state } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [userss, setUsers] = useState<AdminUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/users`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.user?.token}`,
            },
          }
        );
         const filteredUsers = response.data.filter((user: AdminUser) => {
           return (
             user._id !== state.user?.id && user.email !== state.user?.email
           );
         });
        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [state.user?.token]);
  return (
    <div className="h-[70vh] text-center flex flex-col gap-6">
      <div>
        <h1 className="text-2xl xl:text-3xl font-semibold mt-12">
          All <span className="text-rose-400">Users ({userss.length})</span>
        </h1>
      </div>
      {loading ? (
        <Loder />
      ) : (
        
          <div className="sm:w-[40%] mx-auto max-h-[400px] overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {userss.map((user, index) => (
                <Link href={`/admin/${user._id}`}>
                <div
                  key={index}
                  className="flex justify-center items-center py-4 px-6 cursor-pointer hover:bg-slate-100"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {index + 1}.
                  </h3>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 text-base">{user.email}</p>
                  </div>
                </div>
                 </Link>
              ))}
            </ul>
          </div>
       
      )}
    </div>
  );
};

export default page;
