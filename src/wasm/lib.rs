mod utils;

use serde::{Deserialize, Serialize};
use serde_json;
use serde_wasm_bindgen::to_value;
use utils::to_uppercase_custom;
use wasm_bindgen::prelude::*;
use web_sys::{window, Storage};

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn dec(a: i32, b: i32) -> i32 {
    a - b
}

#[wasm_bindgen]
pub fn greet(name: &str, is_upper: Option<bool>) -> String {
    let name = if is_upper.unwrap_or(false) {
        to_uppercase_custom(name)
    } else {
        name.to_string()
    };
    format!("Welcome, {}!", name)
}

#[derive(Debug, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct TodoItem {
    id: usize,
    text: String,
    done: bool,
    description: Option<String>,
}

#[wasm_bindgen]
impl TodoItem {
    #[wasm_bindgen(constructor)]
    pub fn new(id: usize, text: String, description: Option<String>, done: bool) -> TodoItem {
        TodoItem {
            id,
            text,
            done,
            description,
        }
    }
}

#[wasm_bindgen]
pub struct TodoList {
    items: Vec<TodoItem>,
}

#[wasm_bindgen]
impl TodoList {
    #[wasm_bindgen(constructor)]
    pub fn new() -> TodoList {
        let storage = window().unwrap().local_storage().unwrap().unwrap();
        let items = get_items_from_storage(&storage);
        TodoList { items }
    }

    #[wasm_bindgen]
    pub fn add_todo_item(
        &mut self,
        id: usize,
        text: String,
        description: Option<String>,
        done: bool,
    ) {
        let item = TodoItem::new(id, text.clone(), description, done);
        log(&format!("Adding TODO item: {:?}", item));
        self.items.push(item);
        save_items_to_storage(&self.items);
    }

    /**
     * Remove a TODO item from the list.
     *
     * If `id` is provided, the item with that id will be removed,
     * otherwise all items will be removed.
     *
     * @param id Optional TODO item id
     */
    #[wasm_bindgen]
    pub fn remove_item(&mut self, id: Option<usize>) {
        match id {
            Some(id) => {
                self.items.retain(|item| item.id != id);
            }
            None => {
                self.items.clear();
            }
        }
        save_items_to_storage(&self.items);
    }

    #[wasm_bindgen]
    pub fn get_todo_items(&self) -> JsValue {
        let js_items: Vec<JsValue> = self
            .items
            .iter()
            .map(|item| to_value(item).unwrap())
            .collect();
        JsValue::from(js_sys::Array::from_iter(js_items.into_iter()))
    }
}

fn get_items_from_storage(storage: &Storage) -> Vec<TodoItem> {
    let items_json = storage.get_item("todos").unwrap().unwrap_or_default();
    serde_json::from_str(&items_json).unwrap_or_default()
}

fn save_items_to_storage(items: &[TodoItem]) {
    let items_json = serde_json::to_string(items).unwrap();
    window()
        .unwrap()
        .local_storage()
        .unwrap()
        .unwrap()
        .set_item("todos", &items_json)
        .unwrap();
}
