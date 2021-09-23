let countries = [];
let languages = [];

// SEARCH
const elBookSearchForm = document.querySelector('.js-booksearch-form');
const elBookSearchInput = document.querySelector('.js-book-search-input');
const elMinYearInput = document.querySelector('.js-start-year-input');
const elMaxYearInput = document.querySelector('.js-end-year-input')
const elCountriesSelect = document.querySelector('.js-country-select');
const elLanguageSelect = document.querySelector('.js-language-select');
const elSortSelect = document.querySelector('.js-sort-select');
const elBtnSearch = document.querySelector('.btn-search');

// BOOKS SHOW
const elBooksList = document.querySelector('.books-list');

// TEMPLATE
const elBooksTemplate = document.querySelector('#books-item-template').content;

function onBookSearchFormSubmit(evt){
  evt.preventDefault();
  const titleRegex = new RegExp(elBookSearchInput.value.trim(), 'gi');
  const foundBooks = findBooks(titleRegex);

  if (foundBooks.length > 0){
    sortBooks(foundBooks,elSortSelect.value);
    showBooks(foundBooks, titleRegex);
  }else {
    elBooksList.innerHTML = '<div class="col-12">No film found</div>';
  }
}

function findBooks(titleRegex){
  return books.filter(book =>{
    const meetsCriteria = book.title.match(titleRegex) && (elMinYearInput.value.trim() === '' || book.year >= Number(elMinYearInput.value)) && (elMaxYearInput.value.trim() === '' || book.year <= Number(elMaxYearInput.value)) && (elCountriesSelect.value === 'all' || book.country.includes(elCountriesSelect.value)) && (elLanguageSelect.value === 'all' || book.language.includes(elLanguageSelect.value));
    return meetsCriteria;
  });
}

function sortBooks(books, sortType){
  if(sortType === 'az'){
    books.sort((a,b) =>{
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }else if(sortType === 'za'){
    books.sort((a, b) =>{
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
  }else if(sortType === 'year_desc'){
    books.sort((a, b) =>{
      return b.year - a.year;
    });
  }else if(sortType === 'year_asc'){
    books.sort((a, b) =>{
      return a.year - b.year;
    })
  }else if(sortType === 'pages_asc'){
    books.sort((a,b) =>{
      return a.pages - b.pages;
    });
  }else if(sortType === 'pages_desc'){
    books.sort((a,b) =>{
      return b.pages - a.pages;
    });
  }


}

function getCountriesList(){
  books.forEach(book =>{
    if(!countries.includes(book.country)){
      countries.push(book.country);
    }
  });
  countries.sort();
}

function showCountryOptions(){
  const elCountriesFragment = document.createDocumentFragment();
  countries.forEach(country =>{
    const elCountryOption = document.createElement('option')
    elCountryOption.textContent = country;
    elCountryOption.value = country;
    elCountriesFragment.appendChild(elCountryOption);
  });
  elCountriesSelect.appendChild(elCountriesFragment);
}

function getLanguagesList(){
  books.forEach(book =>{
    if(!languages.includes(book.language)){
      languages.push(book.language)
    }
  });
}

function showLanguageOptions(){
  const elLanguagesFragment = document.createDocumentFragment();
  languages.forEach(language =>{
    const elLanguageOption = document.createElement('option');
    elLanguageOption.textContent = language;
    elLanguageOption.value = language;
    elLanguagesFragment.appendChild(elLanguageOption);
  });
  elLanguageSelect.appendChild(elLanguagesFragment);
}

function showBooks(books){
  elBooksList.innerHTML = null;
  const elBooksFragment = document.createDocumentFragment();

  for(let book of books){
    const elBookItem = elBooksTemplate.cloneNode(true);
    elBookItem.querySelector('.book__img').src = book.imageLink;
    elBookItem.querySelector('.book__title').textContent = book.title;
    elBookItem.querySelector('.book__author').textContent = book.author;
    elBookItem.querySelector('.book__pages').textContent = book.pages;
    elBookItem.querySelector('.book__year').textContent = book.year;
    elBookItem.querySelector('.book__language').textContent = book.language;
    elBookItem.querySelector('.book__country').textContent = book.country;
    elBookItem.querySelector('.js-btn-more-info').href = book.link;

    elBooksFragment.appendChild(elBookItem);
  }
  elBooksList.appendChild(elBooksFragment);

}

if(elBtnSearch){
  elBtnSearch.addEventListener('click', onBookSearchFormSubmit)

}



getCountriesList();
getLanguagesList();
showCountryOptions();
showLanguageOptions();
showBooks(books);

