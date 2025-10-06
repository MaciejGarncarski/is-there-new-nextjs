const usernameTagRegexp = new RegExp(/@[\w-]+/gi);

export function parseContributors(releaseBody: string) {
  const tags = releaseBody.match(usernameTagRegexp);

  return tags;
}
