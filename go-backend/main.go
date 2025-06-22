package main

import (
	"encoding/json"
	"fmt"
	jwtUtils "go-backend/utils"
	"net/http"
)

type GeneralResponse struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

func ReturnResponse(w http.ResponseWriter, data interface{}, status string) {
	response := GeneralResponse{
		Status: status,
		Data:   data,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(response)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	username := r.FormValue("user")
	if username == "" {
		fmt.Fprint(w, "Hello, world.")
		return
	}
	fmt.Fprintf(w, "Hello, %s", username)
}

func LoginHandler(responseWriter http.ResponseWriter, request *http.Request) {
	var username string = request.FormValue("username")

	fmt.Printf("User logged in: %s\n", username)
	token, err := jwtUtils.GenerateToken(username)

	if err != nil {
		ReturnResponse(responseWriter, "Generating token failed.", "error")
		return
	}

	ReturnResponse(responseWriter, token, "success")
}

func GetUsername(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")

	username, err := jwtUtils.GetCurrentUsername(token)

	if err != nil || username == "" {
		fmt.Println(err)
		ReturnResponse(w, "Extracting failed.", "error")
		return
	}

	ReturnResponse(w, "Username: "+username, "success")
}

func main() {
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/login", LoginHandler)
	http.HandleFunc("/user/get-name", GetUsername)
	fmt.Println("Server started: http://localhost:8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Internal server error: ", err)
	}
}
