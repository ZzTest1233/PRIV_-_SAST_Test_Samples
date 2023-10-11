#include <stdio.h>

int main()
{
    printf("%s\n", (sizeof('a') == sizeof(char)) ? "C++" : "C");
    return 0;
}
