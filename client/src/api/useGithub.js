import useSWR from "swr";
import axios from "axios";

const fetcher = (url) =>
  axios.get("http://localhost:5000").then((res) => res.data);

const useRepositories = () => {
  const key = `/github/repositories`;

  return useSWR(key, fetcher);
};

const useCollaborators = (repo) => {
  const key = `/github/${repo}/collaborators`

  return useSWR(repo ? key: null , fetcher)
}

const useIssues = (repo) => {
  const key = `/github/${repo}/issues`

  return useSWR(key, fetcher)
}

const useIssue = (repo, issue_number) => {
  const key = `/github/${repo}/issues/${issue_number}`

  return useSWR(key, fetcher)
}
 
export { useRepositories, useCollaborators, useIssues, useIssue };
