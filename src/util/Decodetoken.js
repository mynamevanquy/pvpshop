const decodeJwtPayload = (token) => {
    if (!token || typeof token !== "string") return null;
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) throw new Error("Token không hợp lệ");
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Giải mã token thất bại:", err.message);
      return null;
    }
  };

  export default decodeJwtPayload;