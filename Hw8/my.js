function popup(par) {
    console.log(par);
    let formDiv = document.getElementById("form");
    let bg = document.getElementById("frag");
    if (par === true) {
      formDiv.style.display = ("block");
      document.getElementById("button1").style.display = ("none");
      bg.style.opacity = ("1");
      bg.style.pointerEvents = ("all");
      history.pushState(true, null, "#form");
    }
    else {
      formDiv.style.display = ("none");
      document.getElementById("button1").style.display = ("block");
      bg.style.opacity = ("0");
      bg.style.pointerEvents = ("none");
      history.pushState(false, null, "#");
  
    }
  }
  if (location.hash === "#form") {
    popup(true);
  }
  
  window.addEventListener("popstate", (e) => {
    popup(e);
  })
  
  let b = document.getElementById("button1");
  b.addEventListener("click", () => {
    popup(true);
  });
  
  
  let popupBg = document.getElementById("frag");
  document.addEventListener('click', (e) => {
    console.log(e.target);
    if ((e.target === popupBg)) {
      popup(false);
  
  
    }
  });
  
  let names = document.getElementById('name');
  let email = document.getElementById('email');
  let msg = document.getElementById('message');
  let cb = document.getElementById('check');
  function save() {
    localStorage.setItem('Имя', names.value);
    localStorage.setItem('Почта', email.value);
    localStorage.setItem('Сообщение', msg.value);
    if (cb.checked) {
      localStorage.setItem('Чекбокс', 1);
    } else {
      localStorage.setItem('Чекбокс', 0);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    names.value = localStorage.getItem('Имя');
    email.value = localStorage.getItem('Почта');
    msg.value = localStorage.getItem('Сообщение');
    let checkBox = localStorage.getItem('Чекбокс');
    if (checkBox == 1) {
      cb.checked = true;
    } else if (checkBox == 0) {
      cb.checked = false;
    }
  
    names.oninput = save;
    email.oninput = save;
    msg.oninput = save;
    cb.oninput = save;
    $(function () {
      $(".ajaxForm").submit(function (e) {
        e.preventDefault();
        var href = $(this).attr("action");
        $.ajax({
          type: "POST",
          dataType: "json",
          url: 'https://formcarry.com/s/t3ynqmA_I',
          data: $(this).serialize(),
          success: function (response) {
            if ((response.status == "success") && (cb.checked == true)) {
              alert('Форма отправлена');
              localStorage.removeItem('Имя');
              localStorage.removeItem('Почта');
              localStorage.removeItem('Сообщение');
              localStorage.removeItem('Чекбокс');
              names.value = localStorage.getItem('Имя');
              email.value = localStorage.getItem('Почта');
              msg.value = localStorage.getItem('Сообщение');
              cb.checked = false;
            } else {
              alert("Подтвердите согласие");
            }
          }
        });
      });
    });
  });