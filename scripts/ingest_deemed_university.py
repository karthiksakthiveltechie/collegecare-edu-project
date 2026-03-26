"""
Eng-institutions.json is manually maintained and uploaded; this script does NOT modify it.
Source data parsing (e.g. deemed university.xlsx) is disabled to avoid overwriting the file.
"""
import sys

def main():
    print(
        "Eng-institutions.json is manually maintained. This script does not modify it.",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
