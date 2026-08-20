package main

import (
	"html/template"
	"net/http"
)

type Nav struct {
	Home   HomeNav
	Submit SubmitNav
	Search SearchNav
	About  AboutNav
}

type HomeNav struct {
	Title string
	Link  string
}

type SubmitNav struct {
	Title string
	Link  string
}

type SearchNav struct {
	Title string
	Link  string
}
type AboutNav struct {
	Title string
	Link  string
}

type MainPageData struct {
	Title string
	Menu  Nav
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
	temp, err := template.ParseFiles("../../web/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := MainPageData{
		Title: "Red Green Refactor",
		Menu: Nav{
			Home:   HomeNav{Title: "Home", Link: "/"},
			Search: SearchNav{Title: "Search", Link: "/search"},
			Submit: SubmitNav{Title: "Submit", Link: "/submit"},
			About:  AboutNav{Title: "About", Link: "/about"},
		},
	}
	err = temp.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func aboutpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("../../web/about.html")

	data := AboutPageData{
		Title: "About RGR",
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = temp.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func searchpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("../../web/search.html")

	data := SearchPageData{
		Title: "Search RGR",
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = temp.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func submitpage(w http.ResponseWriter, r *http.Request) {
	temp, err := template.ParseFiles("../../web/submit.html")

	data := SubmitPageData{
		Title: "Submit with RGR",
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = temp.Execute(w, data)
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
