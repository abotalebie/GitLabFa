(function () {
  'use strict';

  var GitLabFaE = document.createElement("div");
  GitLabFaE.id = "GitLabFa";
  document.body.appendChild(GitLabFaE);

  window.addEventListener("load", function () {
    var pun = document.querySelectorAll(".projects-list .project-row .updated-note, .issuable-updated-at");
    var ia = document.querySelectorAll(".issuable-authored");
    var it = document.querySelectorAll(".issue-title");
    var nh = document.querySelectorAll(".note-header");

    if (nh.length > 0) {
      nh.forEach(function (node) {
        var i = node.querySelector(".note-header-info");
        var btn = node.querySelector('.note-actions .more-actions .more-actions-toggle');

        if (btn !== null) {
          var btnCopy = btn.cloneNode(true);
          btn.parentNode.appendChild(btnCopy);
          btn.remove();
        }

        var ul = node.querySelector('.note-actions .more-actions .more-actions-dropdown');
        if (ul !== null) {
          var li = document.createElement("li");
          btn = document.createElement("button");
          btn.type = 'button';
          btn.className = 'btn btn-transparent js-note-replay';
          btn.innerText = "پاسخ به این کامنت";
          btn.addEventListener('click', noteReplay);
          li.appendChild(btn);
          ul.appendChild(li);
        }

        i.querySelector('span.note-header-author-name').nextElementSibling.remove();
        i.querySelector('span.system-note-separator').innerText = " | ";
        var t = i.querySelector('.note-timestamp time');
        t.innerText = new persianDate(new Date(t.getAttribute('data-original-title').replace('pm', ' pm').replace('am', ' am'))).format("YYYY/MM/DD - HH:mm");
      });
    }

    function noteReplay(e) {
      var li = e.target.closest('li.note');
      var txt = ">  [" +
        li.querySelector('.note-text').innerText.replace(/(\r\n|\n|\r)/gm, " ").replace(/^(.{200}[^\s]*).*/, "$1") + " . . . " +
        "](#" + li.id + ")\n\n";
      var te = document.getElementById('note-body');
      te.value = txt;
      document.querySelector('form.new-note').scrollIntoView();
      te.focus();
      te.setSelectionRange(te.value.length, te.value.length);
    }

    if (pun.length > 0) {
      pun.forEach(function (node) {
        var t = node.querySelector('time');
        if (typeof t !== 'undefined') {
          var date = dtp(node.querySelector('time'));
          node.innerHTML = "آخرین تغییر " + date.format("YYYY/MM/DD | HH:mm");
        }
      });
    }

    if (ia.length > 0) {
      ia.forEach(function (node) {
        var time = document.createElement("time");
        var s1 = document.createElement("span");
        var s2 = document.createElement("span");

        time.setAttribute('datetime', node.querySelector('time').getAttribute("datetime"));
        time.innerText = dtp(node.querySelector('time')).format("YYYY/MM/DD | HH:mm");
        GitLabFaE.appendChild(node.querySelector('.author-link'));
        node.innerHTML = '';
        s1.innerText = ' . ایجاد شده توسط ';
        s2.innerText = ' در تاریخ ';
        node.appendChild(s1);
        node.appendChild(GitLabFaE.querySelector('.author-link'));
        node.appendChild(s2);
        node.appendChild(time);

      })
    }

    if (it.length > 0) {
      it.forEach(function (node) {
        var task = node.querySelector(".task-status")
        if (task) {
          var text = task.innerText;
          text = text.replace('of', 'کار از');
          text = text.replace('tasks completed', 'کار انجام شده است');
          task.innerText = ntp(text);
        }
      });
    }
  });

  var dtp = function (e) {
    return new persianDate(new Date(e.getAttribute("datetime")));
  };

  var ntp = function (v) {
    if (typeof v != 'string') {
      if (typeof v === 'undefined') return;
      v = v.toString();
    }

    let p = '';
    for (let i = 0, len = v.length; i < len; i++) {
      if (v.charCodeAt(i) < 48 || v.charCodeAt(i) > 57)
        p += v.charAt(i);
      else
        p += String.fromCharCode(v.charCodeAt(i) + 1728);
    }
    return p;
  }
})();