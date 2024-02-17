import React from "react";

// components

import CardStats from "./../../components/Cards/CardStats.js";
import {useRepositories} from "./../../api/useGithub.js";

export default function HeaderStats({repository, setRepository}) {
  const {data} = useRepositories();

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
            {(data || []).map((repo) => (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4" onClick={() => setRepository(repo.name)}>
              <CardStats
                statSubtitle="PROJECT"
                statTitle={repo.name}
                statDescripiron={repo.id}
              />
            </div>
            ))}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
