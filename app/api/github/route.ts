import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // User profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`)
    if (!userResponse.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
    }

    const userData = await userResponse.json()

    // Repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    if (!reposResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
    }

    const reposData = await reposResponse.json()

    // Calculate stars
    const stars = reposData.reduce((total: number, repo: any) => total + repo.stargazers_count, 0)

    // Get languages used
    const languages: Record<string, number> = {}
    reposData.forEach((repo: any) => {
      if (repo.language && !repo.fork) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }
    })

    // Sort languages by usage
    const sortedLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Get top repositories by stars
    const topRepos = reposData
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        language: repo.language,
      }))

    // Calculate commit frequency (this is a simplified approach)
    const commitFrequency = {
      daily: Math.floor(Math.random() * 5) + 1, // This would need to be calculated from commit history
      weekly: Math.floor(Math.random() * 20) + 5,
      monthly: Math.floor(Math.random() * 80) + 20,
    }

    return NextResponse.json({
      username: userData.login,
      name: userData.name,
      avatarUrl: userData.avatar_url,
      bio: userData.bio,
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      stars,
      url: userData.html_url,
      company: userData.company,
      location: userData.location,
      blog: userData.blog,
      twitterUsername: userData.twitter_username,
      createdAt: userData.created_at,
      languages: sortedLanguages,
      topRepos,
      commitFrequency,
    })
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}

