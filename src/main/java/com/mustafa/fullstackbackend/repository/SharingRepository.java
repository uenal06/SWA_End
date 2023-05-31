package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.FileModel;
import com.mustafa.fullstackbackend.model.Gruppe;
import com.mustafa.fullstackbackend.model.Sharing;
import com.mustafa.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SharingRepository extends JpaRepository<Sharing, Long> {

    @Query("SELECT u FROM User u " +
            "JOIN Sharing s ON u.userId = s.userId WHERE s.directoryId = :directoryId")
    List<User> findUsersByDirectoryId(@Param("directoryId") Long directoryId);

    @Query("SELECT u FROM User u " +
            "JOIN Sharing s ON u.userId = s.userId WHERE s.fileId = :FileId")
    List<User> findUsersByFileId(@Param("FileId") Long directoryId);

    @Query("SELECT f from FileModel f join Sharing s on f.fileId=s.fileId where s.userId=:userId")
    List<FileModel> getSharedFiles(@Param("userId") Long userId);

    Sharing getSharingByUserIdAndDirectoryId(Long userId, Long directoryId);
    Sharing getSharingByUserIdAndFileId(Long userId, Long fileId);

    @Query("select g from Gruppe g join Sharing s on g.groupId=s.groupId WHERE s.directoryId=:directoryId")
    List<Gruppe> findGroupsByDirectoryId(@Param("directoryId") Long directoryId);

    @Query("select g from Gruppe g join Sharing s on g.groupId=s.groupId WHERE s.fileId=:fileId")
    List<Gruppe> findGroupsByFileId(@Param("fileId") Long fileId);

    List<Sharing> getSharingsByGroupIdAndDirectoryId(Long groupId, Long directoryId);

    List<Sharing> getSharingsByGroupIdAndFileId(Long fileId, Long directoryId);

    List<Sharing> getSharingsByUserId(Long userId);




}
