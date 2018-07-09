#include <iostream>

using namespace std;

int size(char a[]);

int main() {
	char a[1000];
	cin.getline(a, 1000);
	cout << size(a) << endl;
	cin.get();
	return 0;
}


//判断是否重复并返回最小索引
int size(char a[]) {
	int first_index = 0;
	int j = 0;
	int temp[26];
	for (int i = 'a'; i <= 'z'; i++) {
		int num_of_char = 0;
		for (int index = 0; index < 1000; index++) {
			if (!a[index])  break;
			if (a[index] == i) {
				if (num_of_char == 0) first_index = index;
				num_of_char++;
			}
		}
			if (num_of_char == 1) {
				temp[j] = first_index;
				j++;
			}
		}
	if (j == 0) return -1;
	int min =temp[0];
	for (int i = 0; i < j; i++) {
		if (temp[i] < min) {
			min = temp[i];
		}
	}
	return min;
}

