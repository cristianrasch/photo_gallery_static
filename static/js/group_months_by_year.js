function cycle(arr) {
  const el = arr.shift();
  arr.push(el);
  return el;
}

function getYear() {
  return location.hash ? Number(location.hash.substring(1)) : new Date().getFullYear();
}

function getDates() {
  return Array.from(document.querySelectorAll('a.list-group-item.list-group-item-action'))
              .map(a => /[A-Z][^.]+/.exec(a.getAttribute('href'))[0])
              .filter(dtStr => MONTHS_RE.test(dtStr))
              .map((dtStr) => {
                const [month, yr] = dtStr.split('_');
                return new Date(Number(yr), MONTHS.indexOf(month));
              });
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November',
                'December'];
const CSS_CLASSES = ['primary', 'secondary', 'success', 'danger', 'warning',
                     'info', 'light', 'dark'];
const MONTHS_RE = new RegExp(`^(?:${MONTHS.join('|')})_(\\d{4})$`);

function setYear(year) {
  updateMonthList(year);
  const yrStr = String(year);
  document.querySelectorAll('a.nav-link')
          .forEach(a => a.classList.toggle('active', a.textContent === yrStr));
}

function buildYearsNav() {
  const year = getYear();
  const dates = getDates();
  const years = [...new Set(dates.map(dt => dt.getFullYear()))];
  years.sort((y1, y2) => y2 - y1);

  yearLinks = years.map(y => `<a class="nav-link${y === year ? ' active' : ''}" href="/#${y}" onclick="setYear(${y})">${y}</a>`)
  const yr_list_html = `<div class="col-2">
                          <aside>
                            <ul class="nav flex-column nav-pills">
                              <li class="nav-item js-year-link">
                                ${yearLinks.join('\n')}
                              </li>
                            </ul>
                          </aside>
                        </div>`

  const col = document.querySelector('.col-6.offset-3');
  col.classList.replace('col-6', 'col-8');
  col.classList.replace('offset-3', 'offset-1')
  col.insertAdjacentHTML('beforebegin', yr_list_html);
}

function updateMonthList(year = getYear()) {
  const dates = getDates();
  dates.sort((d1, d2) => d2.getTime() - d1.getTime());

  const yearMonthsLinks = dates.map((dt) => {
    const month = MONTHS.find((m, idx) => idx === dt.getMonth());
    const folder = `${month}_${dt.getFullYear()}`;
    const cssClass = cycle(CSS_CLASSES);
    return ` <a href="/${folder}.html"
                class="list-group-item list-group-item-action list-group-item-${cssClass} folder${dt.getFullYear() === year ? '' : ' d-none'}">
                ${month}
             </a>`;
  });

  document.querySelector('.list-group').innerHTML = yearMonthsLinks.join('\n');
}

document.addEventListener('DOMContentLoaded', function(){
  buildYearsNav();
  updateMonthList();
});
