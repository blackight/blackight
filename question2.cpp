#include <iostream>
#include <cstdlib>

using namespace std;

struct c {
	int value;
	c * next;
};

int main() {
	c * head = NULL;
	c * p2 = NULL;
	int i = 0;
	cout << "���뼸�����Կո���ֿ�����������ĸ��β����"<<endl;

	//��������
	while (true) {
		int temp;
		cin >> temp;
		if (!cin) break;
		if (head == NULL) {
			head = new c;
			p2 = head;
		}
		else {
			p2->next = new c;
			p2 = p2->next;
		}
		i++;
		p2->value = temp;
		p2->next = NULL;
	}

	//����
	c * first = head;
	c * second =NULL;
	if (head != NULL) {
		second = head->next;
	}
	c * temp = second;
 	for (int j = 1; j <= (i + 1 )/ 2-1; j++) {
		first->next = second->next;
		second->next = first->next->next;
		first->next->next = temp;
		first = first->next;
		second = second->next;
	}


	//���
	c * p = head;
	while (true) {
		if (p == NULL) break;
		cout << p->value << "->";
		p = p->next;
	}
	cout << "NULL" << endl;
	system("pause");
}