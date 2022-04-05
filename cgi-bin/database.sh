#!/bin/bash
#
# This file illustrates the absolute simplest backend that returns data from a
# database backend in JSON.
#
# Example Usage:
#
# View Plants:
# env QUERY_STRING='q=plants' ./cgi-bin/database.sh
#
# Create plant:
# echo -e '{"botanical_name": "test_bot", "common_name": "test"}\n' | env REQUEST_METHOD='POST' CONTENT_LENGTH=55 QUERY_STRING='q=create-plant' ./cgi-bin/database.sh

root_dir='./'
source "${root_dir}cgi-bin/common.sh"

get_url_path path

session=$(get_session_cookie)

post=$(get_post_body)

params=$(get_config_params "$config" "$session" "$post")

request="${path[0]}"

case $(get_request_op "$request" "$params") in
  create_account)
    user_name=$(get_config_param '.user_name' "$post")
    password=$(get_config_param '.password' "$post")
    register "$user_name" "$password"
    http_respond
    query=$(get_request_query "$request" "$params")
    sqlite3 "$database" "$query"
    ;;
  create_session)
    user_name=$(get_config_param '.user_name' "$post")
    password=$(get_config_param '.password' "$post")
    login "$user_name" "$password"
    http_respond
    ;;
  execute|select)
    check_perms "$request" "$session" "$params"
    http_respond
    query=$(get_request_query "$request" "$params")
    sqlite3 "$database" "$query"
    ;;
  insert)
    check_perms "$request" "$session" "$params"
    http_respond
    exec_insert_request "$database" "$request" "$params" "$post"
    ;;
  upsert)
    check_perms "$request" "$session" "$params"
    http_respond
    exec_update_request "$database" "$request" "$params" "$post"
    ;;
  *)
    http_respond
    echo '{"error": "invalid request code"}'
    exit 1;;
esac
