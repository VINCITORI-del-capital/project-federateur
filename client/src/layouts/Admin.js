import React, { useEffect } from "react";
import io from 'socket.io-client';

// components

import AdminNavbar from "./../components/Navbars/AdminNavbar.js";
import Sidebar from "./../components/Sidebar/Sidebar.js";
import HeaderStats from "./../components/Headers/HeaderStats.js";
import FooterAdmin from "./../components/Footers/FooterAdmin.js";

// views

import CardCollaborators from "../components/Cards/CardCollaborators.js";
import { useCollaborators, useIssues } from "../api/useGithub.js";
import CardIssues from "../components/Cards/CardIssues.js";

export default function Admin() {
  const [repository, setRepository] = React.useState();
  const {data: collaborators} = useCollaborators(repository);
  const {data: issues, mutate} = useIssues(repository);

  useEffect(() => {
    // Connect to the server
    const socket = io('http://localhost:5000');

    // Listen for 'message' event
    socket.on('issues_update', (data) => {
      mutate();
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats repository={repository} setRepository={setRepository} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {collaborators && <CardCollaborators collaborators={collaborators} />}
          {issues && <CardIssues issues={issues} />}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
