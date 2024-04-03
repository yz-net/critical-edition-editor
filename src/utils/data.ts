import { Octokit } from "@octokit/rest";

import type { Config } from "~/types/config";
import type { Essay } from "~/types/essay";

const octokit = new Octokit();

export const fetchGitHubData: () => Promise<{
  config: Config;
  essays: Essay[];
}> = async () => {
  const data: { config: Config; essays: Essay[] } = {
    config: {
      projectData: {
        title: "",
        subtitle: "",
        introCopy: "",
        homeLink: "",
        callToAction: false,
        impactImageCaption: "",
        organizationName: "",
        parentOrganizationName: "",
        parentOrganizationURL: "",
        showBylinesOnIndexPage: false,
        showSupertitlesOnIndexPage: false,
        textOnlyIndexPage: false,
        essayOrder: [],
      },
      essays: [],
    },
    essays: [],
  };
  try {
    const res = await octokit.rest.repos.getContent({
      owner: "probably-an-organization",
      repo: "critical-editions-content",
      path: "/data",
      ref: "staging",
    });

    if (!Array.isArray(res.data)) {
      throw Error("GitHub content is not an array (of files)");
    }

    for (const file of res.data) {
      if (!file.download_url) continue;
      const fileData = await (await fetch(file.download_url)).json();
      if (file.name === "config.json") {
        data.config = fileData;
      } else if (file.name.includes("intro-hvt")) {
        data.essays.push(fileData);
      }
    }
  } catch (err) {
    alert(err);
  }

  return data;
};
