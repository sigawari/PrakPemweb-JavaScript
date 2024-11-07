function submitForm(event) {
  event.preventDefault(); // Mencegah form dari reload

  // Ambil nilai dari input form
  const username = document.getElementById("name").value;
  const email = document.getElementById("emailUser").value;
  const password = document.getElementById("passwordUser").value;
  const confirmPassword = document.getElementById("passwordConfirm").value;

  // Validasi input
  if (!validateUsername(username)) {
    document.getElementById("usernameError").innerText =
      "Username harus berupa huruf kecil dan kombinasi angka (5-20 karakter).";
    return;
  } else {
    document.getElementById("usernameError").innerText = "";
  }

  if (!validateEmail(email)) {
    document.getElementById("emailError").innerText = "Email tidak valid.";
    return;
  } else {
    document.getElementById("emailError").innerText = "";
  }

  // Memeriksa kekuatan password
  const passwordFeedback = checkPasswordStrength(password);
  if (passwordFeedback !== "Password sangat kuat. Gaskan") {
    document.getElementById("passwordError").innerText = passwordFeedback;
    return;
  } else {
    document.getElementById("passwordError").innerText = "";
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").innerText =
      "Konfirmasi password tidak sesuai.";
    return;
  } else {
    document.getElementById("confirmPasswordError").innerText = "";
  }

  // Simpan data ke localStorage
  const response = {
    username: username,
    email: email,
    password: password,
  };

  let responses = JSON.parse(localStorage.getItem("responses")) || [];
  responses.push(response);
  localStorage.setItem("responses", JSON.stringify(responses));

  // Tanyakan konfirmasi sebelum mengirim
  const confirmation = confirm("Apakah Anda yakin ingin mendaftar?");
  if (confirmation) {
    alert("Pendaftaran berhasil!");
    document.getElementById("registrationForm").reset(); // Reset
  }
}

// Fungsi untuk validasi username
function validateUsername(username) {
  const usernameRegex = /^[a-z0-9]{5,20}$/; // Username harus huruf kecil dan bisa mengandung angka, panjang 5-20 karakter
  return usernameRegex.test(username);
}

// Fungsi untuk validasi email
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Fungsi untuk memeriksa kekuatan password dan memberikan feedback
function checkPasswordStrength(password) {
  var strength = 0;
  var tips = "";

  // Cek panjang password
  if (password.length < 8) {
    tips += "Password harus lebih panjang, minimal 8 karakter. ";
  } else {
    strength += 1;
  }

  // Cek untuk kombinasi huruf besar dan kecil
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips +=
      "Gunakan kombinasi huruf besar dan kecil untuk meningkatkan keamanan. ";
  }

  // Cek untuk angka
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Menambahkan angka akan membuat password lebih kuat. ";
  }

  // Cek untuk karakter khusus
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Sertakan karakter khusus (seperti !, @, #).";
  }

  // Memberikan feedback berdasarkan tingkat kekuatan password
  if (strength < 2) {
    return "Password terlalu lemah. " + tips;
  } else if (strength === 2) {
    return "Password cukup kuat, namun bisa lebih baik. " + tips;
  } else if (strength === 3) {
    return "Password kuat, namun masih bisa lebih aman. " + tips;
  } else {
    return "Password sangat kuat. Gaskan";
  }
}

// Fungsi untuk memberikan feedback realtime pada input
function realTimeValidation() {
  const usernameInput = document.getElementById("name");
  usernameInput.addEventListener("input", function () {
    if (!validateUsername(usernameInput.value)) {
      document.getElementById("usernameError").innerText =
        "Username harus berupa huruf kecil dan kombinasi angka (5-20 karakter).";
    } else {
      document.getElementById("usernameError").innerText = "";
    }
  });

  // Validasi email secara realtime
  const emailInput = document.getElementById("emailUser");
  emailInput.addEventListener("input", function () {
    if (!validateEmail(emailInput.value)) {
      document.getElementById("emailError").innerText = "Email tidak valid.";
    } else {
      document.getElementById("emailError").innerText = "";
    }
  });

  // Validasi password secara realtime
  const passwordInput = document.getElementById("passwordUser");
  passwordInput.addEventListener("input", function () {
    const passwordFeedback = checkPasswordStrength(passwordInput.value);
    document.getElementById("passwordError").innerText = passwordFeedback;

    // Hanya hilangkan pesan error jika password sangat kuat
    if (passwordFeedback === "Password sangat kuat. Gaskan") {
      document.getElementById("passwordError").innerText = "";
    }
  });

  // Validasi konfirmasi password secara realtime
  const confirmPasswordInput = document.getElementById("passwordConfirm");
  confirmPasswordInput.addEventListener("input", function () {
    if (passwordInput.value !== confirmPasswordInput.value) {
      document.getElementById("confirmPasswordError").innerText =
        "Konfirmasi password tidak sesuai.";
    } else {
      document.getElementById("confirmPasswordError").innerText = "";
    }
  });
}

// Jalankan validasi realtime saat halaman dimuat (DOM)
document.addEventListener("DOMContentLoaded", function () {
  realTimeValidation();
});
