export const uploadToGitHub = async (content: string) => {
    const token = prompt("GitHub Personal Access Token 입력:");
    const username = prompt("GitHub 사용자명:");
    const repo = prompt("저장소 이름:");
    const path = prompt("저장할 파일 경로 (예: notes/note.md):");
  
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "upload markdown from memo app",
        content: btoa(unescape(encodeURIComponent(content))),
      }),
    });
  
    if (res.ok) {
      alert("✅ 업로드 성공!");
    } else {
      alert("❌ 업로드 실패!");
    }
  };