package jwtUtils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenStruct struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

var secretKey string = "wouenjfk21983uihwn3r9ewrgubijnrq9efw08grhuo"

func GenerateToken(username string) (string, error) {
	now := time.Now()
	claims := TokenStruct{
		username,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
		},
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	s, err := t.SignedString([]byte(secretKey))

	return s, err
}

func ExtractClaims(token string) (*TokenStruct, error) {
	t, err := jwt.ParseWithClaims(
		token,
		&TokenStruct{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(secretKey), nil
		})
	if claims, ok := t.Claims.(*TokenStruct); ok && t.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}

func GetCurrentUsername(token string) (string, error) {
	if token == "" {
		fmt.Println("No token")
		return "", nil
	}
	claims, err := ExtractClaims(token)
	if err != nil {
		return "", err
	}
	username := claims.Username

	return username, err
}
