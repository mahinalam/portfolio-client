"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAllSkillsQuery } from "../../redux/api/baseApi";

const MySkills = () => {
  const {
    data: skillsInfo,
    isFetching,
    refetch,
    isLoading,
  } = useGetAllSkillsQuery(undefined);
  //   console.log(roomInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Record<string, any> | null>(
    null
  );
  const [deleteModalId, setDeleteModalId] = useState("");
  //   const [deleteRoom] = useDeleteRoomMutation();
  //   const [updateRoom] = useUpdateRoomMutation();
  const [formResetter, setFormResetter] = useState<() => void>(() => () => {});

  if (isLoading) {
    return <p>Loading ..</p>;
  }
  //   console.log("selectedRoom", selectedRoom);
  // const onSubmit = async (data: any) => {
  //   try {
  //     const updatedRoomInfo = {
  //       name: data.name,
  //       roomNo: Number(data.roomNo),
  //       floorNo: Number(data.floorNo),
  //       capacity: Number(data.capacity),
  //       pricePerSlot: Number(data.pricePerSlot),
  //       amenities: data.amenities,
  //     };

  //     if (selectedRoom) {
  //       const res = await updateRoom({
  //         id: selectedRoom.key,
  //         data: updatedRoomInfo,
  //       });
  //       console.log({ res });

  //       if ((res as any)?.data?.success) {
  //         toast.success((res as any)?.data?.message);
  //         refetch(); // <-- UPDATED: Refetch room data after update
  //         setIsModalOpen(false); // <-- UPDATED: Close modal after successful update
  //         setSelectedRoom(null);
  //       } else {
  //         toast.error((res as any).error.data.message);
  //       }
  //       setIsModalOpen(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleUpdateClick = (room: any) => {
    console.log(room);
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    formResetter();
    setSelectedRoom(null);
  };

  const showDeleteModal = (id: string) => {
    setDeleteModalId(id);
    setIsDeleteModalOpen(true);
  };

  //   const handleDeleteOk = async () => {
  //     const res = await deleteRoom(deleteModalId);
  //     if (res?.data?.success) {
  //       toast.success("Room deleted successfully.");
  //       refetch();
  //     } else {
  //       toast.success("Failed to delete room!");
  //     }
  //     setIsDeleteModalOpen(false);
  //   };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const tableData = skillsInfo?.data?.map(
    ({ _id, name, createdAt }: Record<string, unknown>, index: number) => ({
      key: _id,
      index: index + 1,
      name,
      createdAt,
    })
  );

  const columns = [
    {
      title: "Index",
      key: "index",
      dataIndex: "index",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <>
            <Button onClick={() => showDeleteModal(item.key)} className="ml-2">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
      {/* <Modal
          title="Update Room"
          visible={isModalOpen}
          onCancel={handleModalCancel}
          footer={null}
        >
          <PHForm
            onSubmit={onSubmit}
            key={selectedRoom?._id} // Ensure form re-renders when a new room is selected
            onReset={(resetFunction) => setFormResetter(() => resetFunction)}
          >
            <PHInput type="text" name="name" label="Name" />
            <PHInput type="number" name="roomNo" label="Room number" />
            <PHInput type="number" name="floorNo" label="Floor number" />
            <PHInput type="number" name="capacity" label="Capacity" />
            <PHInput type="number" name="pricePerSlot" label="Price per slot" />
            <PHSelect
              label="Amenities"
              name="amenities"
              mode="multiple"
              options={amenitiesOptions}
            />
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              className="w-full mx-auto"
            >
              Submit
            </Button>
          </PHForm>
        </Modal>
        <Modal
          title="Delete Room"
          visible={isDeleteModalOpen}
          onOk={handleDeleteOk}
          onCancel={handleDeleteCancel}
        >
          <p>Are you sure want to delete this room?</p>
        </Modal> */}
    </>
  );
};

export default MySkills;
