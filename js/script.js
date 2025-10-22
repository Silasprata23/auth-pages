// Seleciona o formulário
const form = document.querySelector("form");

// Captura o evento de envio
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  // Pega os valores dos campos
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  // Validação simples
  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    // Envia os dados para o backend (ajuste a URL conforme seu servidor)
    const response = await fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Lê a resposta como JSON
    const data = await response.json();

    // Trata a resposta
    if (response.ok) {
      alert("✅ Login successful!");
      console.log("User data:", data);

      // Exemplo: salvar token no localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirecionar para outra página
      window.location.href = "/dashboard.html";
    } else {
      // Mostra mensagem de erro vinda do backend
      alert(`❌ Error: ${data.message || "Invalid credentials"}`);
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    alert("⚠️ Server error. Please try again later.");
  }
});
