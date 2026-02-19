(function() {
  var target = document.getElementById('sidebar');
  if (!target) return;

  target.innerHTML = `
    <div style="text-align:start;display:flex;flex-direction:column;align-items:baseline;">
      <a href="/" style="text-decoration:none;color:inherit;">
        <span style="font-family:'Noe Standard','Times New Roman',serif;font-weight:400;font-size:32px;">Timothy</span><br>
        <span style="font-family:'Noe Standard','Times New Roman',serif;font-weight:400;font-size:32px;">Liu</span>
      </a>

      <ul style="padding-top:1rem;list-style:none;padding-left:0;font-size:12px;text-align:left;">
        <li style="margin-top:4px;"><a href="https://github.com/tbliu" target="_blank">GitHub</a></li>
        <li style="margin-top:4px;"><a href="https://www.linkedin.com/in/tbliu/" target="_blank">LinkedIn</a></li>
        <li style="margin-top:4px;"><a href="https://twitter.com/tbliu" target="_blank">Twitter</a></li>
        <li style="margin-top:4px;"><a href="/blog">Blog</a></li>
      </ul>
    </div>
  `;
})();
