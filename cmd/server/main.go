package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type MainPageData struct {
	Title string
}

type AboutPageData struct {
	Title string
}

type SearchPageData struct {
	Title string
}

type SubmitPageData struct {
	Title string
}

func mainpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("./web/index.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = temp.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func aboutpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("./web/about.html")

	if err != nil {
		fmt.Println("Error parsing template:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = temp.Execute(w, nil)
	if err != nil {
		fmt.Println("Error executing template:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func searchpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("./web/search.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = temp.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func submitpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("./web/submit.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = temp.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
func main() {
	http.HandleFunc("/", mainpage)
	http.HandleFunc("/about", aboutpage)
	http.HandleFunc("/search", searchpage)
	http.HandleFunc("/submit", submitpage)
	http.ListenAndServe(":8080", nil)
}
