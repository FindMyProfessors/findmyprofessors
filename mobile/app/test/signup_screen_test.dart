import 'package:flutter_test/flutter_test.dart';
import 'package:app/screens/signup_screen.dart'; // Adjust the import path according to your project structure


String validatePassword(String password) {
    // Regular expressions for different requirements
    final RegExp hasUppercase = RegExp(r'(?=.*[A-Z])');
    final RegExp hasLowercase = RegExp(r'(?=.*[a-z])');
    final RegExp hasDigit = RegExp(r'(?=.*\d)');
    final RegExp hasSpecialChar = RegExp(r'(?=.*[@$!%*?&])');

    // List to collect missing requirements
    List<String> missingRequirements = [];

    // Check each requirement and add to the list if missing
    if (password.length < 8) {
      missingRequirements.add('\n\t\t\t\t\t\tat least 8 characters long');
    }
    if (password.length >= 50) {
      missingRequirements.add('\n\t\t\t\t\t\tat most 50 characters long');
    }
    if (!hasUppercase.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain an uppercase letter');
    }
    if (!hasLowercase.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a lowercase letter');
    }
    if (!hasDigit.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a digit');
    }
    if (!hasSpecialChar.hasMatch(password)) {
      missingRequirements.add('\n\t\t\t\t\t\tmust contain a special character');
    }

    // Return the missing requirements or a success message
    if (missingRequirements.isEmpty) {
      return '';
    } else {
      return missingRequirements.join();
    }
}
void main() {
  group('validatePassword', () {
    test('should return an empty string when the password is valid', () {
      String password = 'Valid@1234';
      String result = validatePassword(password);
      expect(result, '');
    });

    test('should return error message when password is less than 8 characters', () {
      String password = 'Va@123';
      String result = validatePassword(password);
      expect(result, contains('at least 8 characters long'));
    });

    test('should return error message when password is more than 50 characters', () {
      String password = 'V' * 51 + '@1234';
      String result = validatePassword(password);
      expect(result, contains('at most 50 characters long'));
    });

    test('should return error message when password does not contain an uppercase letter', () {
      String password = 'valid@1234';
      String result = validatePassword(password);
      expect(result, contains('must contain an uppercase letter'));
    });

    test('should return error message when password does not contain a lowercase letter', () {
      String password = 'VALID@1234';
      String result = validatePassword(password);
      expect(result, contains('must contain a lowercase letter'));
    });

    test('should return error message when password does not contain a digit', () {
      String password = 'Valid@abcd';
      String result = validatePassword(password);
      expect(result, contains('must contain a digit'));
    });

    test('should return error message when password does not contain a special character', () {
      String password = 'Valid1234';
      String result = validatePassword(password);
      expect(result, contains('must contain a special character'));
    });

    test('should return error messages for multiple requirements', () {
      String password = 'val';
      String result = validatePassword(password);
      expect(result, allOf(
        contains('at least 8 characters long'),
        contains('must contain an uppercase letter'),
        contains('must contain a digit'),
        contains('must contain a special character')
      ));
    });
  });
}
