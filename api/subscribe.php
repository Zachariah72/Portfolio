<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $file = 'subscribers.txt';
        // Open the file to get existing content
        $current = file_get_contents($file);
        // Append the new email to the file
        $current .= $email . "\n";
        // Write the contents back to the file
        file_put_contents($file, $current);
        echo "Thank you for subscribing!";
    } else {
        http_response_code(400);
        echo "Invalid email address.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>