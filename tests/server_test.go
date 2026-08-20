package main

import (
	"net/http"
	"testing"
)

func TestIsServerRunningAndPagesReturning(t *testing.T) {

	t.Run("main returns a status code 200", func(t *testing.T) {
		response, err := http.Get("http://localhost:8080")
		if err != nil {
			t.Fatal("Server not running")
		}

		want := 200
		got := response.StatusCode

		if got != want {
			t.Errorf("got: %d, want: %d", got, want)
		}
		defer response.Body.Close()
	})

	t.Run("about page returns a status code 200", func(t *testing.T) {
		response, err := http.Get("http://localhost:8080/about")
		if err != nil {
			t.Fatal("About page not present")
		}

		want := 200
		got := response.StatusCode

		if got != want {
			t.Errorf("got: %d, want: %d", got, want)
		}
		defer response.Body.Close()
	})

	t.Run("search page returns a status code 200", func(t *testing.T) {
		response, err := http.Get("http://localhost:8080/search")
		if err != nil {
			t.Fatal("About page not present")
		}

		want := 200
		got := response.StatusCode

		if got != want {
			t.Errorf("got: %d, want: %d", got, want)
		}
		defer response.Body.Close()
	})

	t.Run("submit page returns a status code 200", func(t *testing.T) {
		response, err := http.Get("http://localhost:8080/submit")
		if err != nil {
			t.Fatal("About page not present")
		}

		want := 200
		got := response.StatusCode

		if got != want {
			t.Errorf("got: %d, want: %d", got, want)
		}
		defer response.Body.Close()
	})
}
