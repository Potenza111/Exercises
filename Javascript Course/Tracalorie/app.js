// Storage Controller
const StorageCtrl = (function() {
  // Public Methods
  return {
    storeItem: item => {
      let items;

      // Check if any items in local storage
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      // Push New Item
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    },

    getItemsFromStorage: () => {
      let items = [];

      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    },

    updateItemStorage: updatedItem => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          // Remove old item and replace with uopdated Item
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },

    deleteItemFromStorage: itemid => {
      let items = JSON.parse(localStorage.getItem("items"));

      items.forEach((item, index) => {
        if (itemid === item.id) {
          // Remove old item and replace with uopdated Item
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },

    deleteItemsFromStorage: () => {
      localStorage.removeItem("items");
    }
  };
})();

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure
  const data = {
    // items: [
    // { id: 0, name: "Steak Dinner", calories: 1200 },
    // { id: 1, name: "Cookies", calories: 400 },
    // { id: 2, name: "Eggs", calories: 300 }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function() {
      return data;
    },

    getItems: () => {
      return data.items;
    },

    addItem: (name, calories) => {
      let ID;

      // Create Id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create New Item
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },

    getTotalCalories: () => {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },

    getItemByID: id => {
      let found = null;

      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    setCurrentItem: item => {
      data.currentItem = item;
    },

    getCurrentItem: () => {
      return data.currentItem;
    },

    updateItem: (name, calories) => {
      // calories to number
      calories = parseInt(calories);
      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: id => {
      // Get Id's
      const ids = data.items.map(item => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // remove item
      data.items.splice(index, 1);
    },

    clearAllItems: () => {
      data.items = [];
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    // All li's
    listItems: "#item-list li",
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn"
  };

  return {
    populateItemsList: items => {
      let html = "";

      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
          </li>
        `;
      });

      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getSelectors: () => {
      return UISelectors;
    },

    getInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    addListItem: item => {
      // Show Item List
      document.querySelector(UISelectors.itemList).style.display = "block";

      // Create li element
      const li = document.createElement("li");
      // Add Class
      li.className = "collection-item";

      // Add ID
      li.id = `item-${item.id}`;

      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
        `;

      // insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: totalCalories => {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },

    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    addItemToForm: () => {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
    },

    updateListItem: updatedItem => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Convert Nodelist to array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        // Retrieves the ID attr
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${updatedItem.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `         
          <strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
          `;
        }
      });
    },

    deleteListItem: id => {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(item => {
        item.remove;
      });
    }
  };
})();

// App Controller
const App = (function(StorageCtrl, ItemCtrl, UICtrl) {
  // Load Event Listners
  const LoadEventListners = function() {
    const uiSelectors = UICtrl.getSelectors();

    // Add Item Event
    document
      .querySelector(uiSelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // diable submit on enter
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon Click event
    document
      .querySelector(uiSelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update button Click event
    document
      .querySelector(uiSelectors.updateBtn)
      .addEventListener("click", itemUpdateClick);

    // Back button Click event
    document
      .querySelector(uiSelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // Delete button Click event
    document
      .querySelector(uiSelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Delete button Click event
    document
      .querySelector(uiSelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add ItemSubmit
  const itemAddSubmit = e => {
    // Get Form Input From UI Controller
    const input = UICtrl.getInput();

    // check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add Item To UI List
      UICtrl.addListItem(newItem);

      // Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store In LocalStorage
      StorageCtrl.storeItem(newItem);

      // Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  const itemEditClick = e => {
    if (e.target.classList.contains("edit-item")) {
      // Get List item ID
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArray = listId.split("-");

      // Get Actual ID
      const id = parseInt(listIdArray[1]);

      // Get Item
      const itemToEdit = ItemCtrl.getItemByID(id);

      // Set CurrentItem
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();

      UICtrl.showEditState();
    }

    e.preventDefault();
  };

  const itemUpdateClick = e => {
    // GetItemInput
    const input = UICtrl.getInput();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update Item in List
    UICtrl.updateListItem(updatedItem);

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update Local Storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const itemDeleteSubmit = e => {
    // Get Current Item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from Datastruct
    ItemCtrl.deleteItem(currentItem.id);

    // Delete From UI
    UICtrl.deleteListItem(currentItem.id);

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from localStorage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const clearAllItemsClick = e => {
    // Delete All Items From Datastructure
    ItemCtrl.clearAllItems();

    // Remove Items from UI
    UICtrl.removeItems();

    // Delete All Items from Local Storage
    StorageCtrl.deleteItemsFromStorage();

    UICtrl.showTotalCalories(0);
    UICtrl.clearEditState();
    UICtrl.hideList();
  };

  return {
    init: function() {
      console.log("Initialising App....");

      //  Clear Edit state
      UICtrl.clearEditState();

      // Fetch Items From Data Structure
      const items = ItemCtrl.getItems();

      // Load Event Listners
      LoadEventListners();

      // Check if any items Exist
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate Lists with Items
        UICtrl.populateItemsList(items);
      }

      // Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
    }
  };
})(StorageCtrl, ItemCtrl, UICtrl);

App.init();
