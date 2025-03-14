import { NextResponse } from "next/server"

// Server-side implementation of LeetCode data fetching using their GraphQL API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // LeetCode GraphQL API endpoint
    const endpoint = "https://leetcode.com/graphql"

    // GraphQL query to get user profile data
    const profileQuery = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
              ranking
              reputation
              starRating
              aboutMe
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            badges {
              id
              displayName
              icon
              creationDate
            }
            problemsSolvedBeatsStats {
              difficulty
              percentage
            }
          }
        }
      `,
      variables: { username },
    }

    // GraphQL query to get contest rating
    const contestQuery = {
      query: `
        query userContestRanking($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
              name
            }
          }
          userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
              title
              startTime
            }
          }
        }
      `,
      variables: { username },
    }

    // Make the API requests - on the server side, CORS is not an issue
    const [profileResponse, contestResponse] = await Promise.all([
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileQuery),
        // Add a short timeout to avoid hanging requests
        signal: AbortSignal.timeout(5000),
      }),
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contestQuery),
        signal: AbortSignal.timeout(5000),
      }),
    ])

    if (!profileResponse.ok) {
      throw new Error(`LeetCode profile API failed: ${profileResponse.status}`)
    }

    if (!contestResponse.ok) {
      throw new Error(`LeetCode contest API failed: ${contestResponse.status}`)
    }

    // Parse the responses
    const profileData = await profileResponse.json()
    const contestData = await contestResponse.json()

    // Check if user exists
    if (!profileData.data?.matchedUser) {
      return NextResponse.json({ error: "LeetCode user not found" }, { status: 404 })
    }

    const user = profileData.data.matchedUser
    const contestRanking = contestData.data?.userContestRanking
    const contestHistory = contestData.data?.userContestRankingHistory || []

    // Extract submission stats
    const submissionStats = user.submitStats.acSubmissionNum.reduce((acc: any, curr: any) => {
      acc[curr.difficulty.toLowerCase()] = curr.count
      return acc
    }, {})

    // Calculate total problems (placeholder values, ideally these would be fetched from the API)
    const totalProblems = {
      easy: 594,
      medium: 1213,
      hard: 507,
    }

    // Get recent contest performance
    const recentContests = contestHistory.slice(0, 5).map((contest: any) => ({
      title: contest.contest.title,
      date: new Date(contest.contest.startTime * 1000).toLocaleDateString(),
      solved: contest.problemsSolved,
      total: contest.totalProblems,
      ranking: contest.ranking,
      rating: contest.rating,
    }))

    // Format and return the data
    const formattedData = {
      username: user.username,
      realName: user.profile.realName,
      avatarUrl: user.profile.userAvatar,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      starRating: user.profile.starRating,
      aboutMe: user.profile.aboutMe,
      totalSolved: submissionStats.easy + submissionStats.medium + submissionStats.hard,
      easySolved: submissionStats.easy,
      mediumSolved: submissionStats.medium,
      hardSolved: submissionStats.hard,
      totalProblems,
      acceptanceRate: "67.5%", // This is a placeholder
      contestRating: contestRanking?.rating || "N/A",
      contestRanking: contestRanking?.globalRanking || "N/A",
      contestsAttended: contestRanking?.attendedContestsCount || 0,
      topPercentage: contestRanking?.topPercentage || "N/A",
      badges: user.badges,
      recentContests,
      url: `https://leetcode.com/${username}`,
    }

    return NextResponse.json(formattedData)
  } catch (error: any) {
    console.error("Error fetching LeetCode data:", error)
    
    // Fallback to mock data if the real API fails (in production you might want to show the error instead)
    const mockData = {
      username,
      totalSolved: 248,
      easySolved: 120,
      mediumSolved: 85,
      hardSolved: 43,
      acceptanceRate: "67.5%",
      ranking: 15243,
      contestRating: 1842,
      url: `https://leetcode.com/${username}`,
      isMockData: true, // Flag to indicate this is mock data
    }
    
    return NextResponse.json(mockData)
  }
}

