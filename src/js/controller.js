import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_TIME } from './config.js';
import { async } from 'regenerator-runtime';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Getting & displaying - Recipe
const controlRecipes = async function () {
  // fetching recipe
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderLoadingSpinner();

    // update result view to mark selected search
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    // loading recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
    // controlServings()
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderLoadingSpinner();
    // get search query
    const query = searchView.getQuery();

    if (!query) return;
    // load query
    await model.loadSearchResults(query);
    // render query

    resultsView.render(model.getSearchResultsPage(1));

    // render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (gotoBtn) {
  // render new query
  resultsView.render(model.getSearchResultsPage(gotoBtn));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the servings
  model.updateServings(newServings);

  // updating the Recipe View 
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // adding and removing bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // updating the reccipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlControlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // loading
    addRecipeView.renderLoadingSpinner();

    // upload new recipe
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success Message
    addRecipeView.renderSuccess();

    // render bookmark
    bookmarkView.render(model.state.bookmarks);

    // change url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_TIME * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

// event listener for window
const init = function () {
  bookmarkView.eventHandlerRender(controlControlBookmark);
  recipeView.eventHandelerRender(controlRecipes);
  searchView.eventHandlerSearch(controlSearchResults);
  paginationView.eventHandlerPagination(controlPagination);
  recipeView.eventHandelerUpdateServings(controlServings);
  recipeView.eventHandelerAddBookmark(controlAddBookmark);
  addRecipeView._eventHandlerUpload(controlAddRecipe);
};
init();
