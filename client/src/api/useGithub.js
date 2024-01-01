import useSWR from "swr";
import axios from "axios";

const fetcher = (url) =>
  axios.get("http://localhost:5585" + url).then((res) => res.data);

const useRepositories = () => {
  const key = `/github/repositories`;

  return useSWR(key, fetcher);
};

const useCollaborators = (repo) => {
  const key = `/github/${repo}/collaborators`

  return useSWR(key, fetcher)
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
